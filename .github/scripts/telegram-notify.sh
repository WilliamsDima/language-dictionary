#!/usr/bin/env bash
# Telegram build notifications for release-apk.yml: one message per run.
#
#   telegram-notify.sh start            - sends "🟡 build started", saves
#                                         TG_MESSAGE_ID / TG_STARTED_AT to $GITHUB_ENV
#   telegram-notify.sh finish <status>  - edits that message to the result
#                                         (success | failure | cancelled); sends a
#                                         new one if there is no message_id
#
# Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (repo secrets; either empty = skip),
# COMMIT_MESSAGE (push only), VERSION_NAME / VERSION_CODE (optional), plus the
# default GITHUB_* variables.
#
# Never fails the build: no `set -e`, every error is logged and the script
# always exits 0 (the workflow steps also have continue-on-error: true).

GRADLE_FILE=android/app/build.gradle
DOWNLOAD_URL=https://wordcards-admin.duckdns.org/download

log() { echo "telegram-notify: $*"; }

html_escape() {
  # quoted replacements: in bash 5.2+ an unquoted & means "the matched text"
  local s=$1 amp='&amp;' lt='&lt;' gt='&gt;'
  s=${s//&/"$amp"}
  s=${s//</"$lt"}
  s=${s//>/"$gt"}
  printf '%s' "$s"
}

# $1 = Bot API method, $2 = JSON payload; prints the response body
tg_call() {
  curl -sS --max-time 10 \
    -H 'Content-Type: application/json' \
    -d "$2" \
    "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/$1"
}

# $1 = text; prints message_id on success
send_message() {
  local payload response
  payload="$(jq -n --arg chat "$TELEGRAM_CHAT_ID" --arg text "$1" \
    '{chat_id: $chat, text: $text, parse_mode: "HTML", disable_web_page_preview: true}')" || return 1
  response="$(tg_call sendMessage "$payload")" || { log "sendMessage request failed"; return 1; }
  if [ "$(printf '%s' "$response" | jq -r '.ok // false' 2>/dev/null)" != "true" ]; then
    log "sendMessage error: $(printf '%s' "$response" | jq -r '.description // .' 2>/dev/null)"
    return 1
  fi
  printf '%s' "$response" | jq -r '.result.message_id // empty' 2>/dev/null
}

# $1 = message_id, $2 = text
edit_message() {
  local payload response
  payload="$(jq -n --arg chat "$TELEGRAM_CHAT_ID" --argjson id "$1" --arg text "$2" \
    '{chat_id: $chat, message_id: $id, text: $text, parse_mode: "HTML", disable_web_page_preview: true}')" || return 1
  response="$(tg_call editMessageText "$payload")" || { log "editMessageText request failed"; return 1; }
  if [ "$(printf '%s' "$response" | jq -r '.ok // false' 2>/dev/null)" != "true" ]; then
    log "editMessageText error: $(printf '%s' "$response" | jq -r '.description // .' 2>/dev/null)"
    return 1
  fi
}

# Lines after the title: version, commit, author, run link
body() {
  local version_name=$VERSION_NAME version_line commit_line subject short_sha run_url
  if [ -z "$version_name" ] && [ -f "$GRADLE_FILE" ]; then
    version_name="$(sed -nE 's/^[[:space:]]*versionName "([^"]+)"[[:space:]]*$/\1/p' "$GRADLE_FILE" | head -n 1)"
  fi
  if [ -n "$version_name" ]; then
    version_line="Версия: <b>$(html_escape "$version_name")</b>"
    [ -n "$VERSION_CODE" ] && version_line="$version_line ($(html_escape "$VERSION_CODE"))"
  fi

  short_sha="${GITHUB_SHA:0:7}"
  if [ "$GITHUB_EVENT_NAME" = "workflow_dispatch" ]; then
    commit_line="<code>$short_sha</code> — вручную"
  else
    subject="${COMMIT_MESSAGE%%$'\n'*}"
    subject="${subject%$'\r'}"
    [ "${#subject}" -gt 200 ] && subject="${subject:0:200}…"
    commit_line="<code>$short_sha</code> — $(html_escape "$subject")"
  fi

  run_url="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"

  [ -n "$version_line" ] && printf '%s\n' "$version_line"
  printf '%s\n' "$commit_line"
  printf 'Автор: %s\n' "$(html_escape "$GITHUB_ACTOR")"
  printf '<a href="%s">Открыть запуск</a>' "$run_url"
}

duration() {
  local now elapsed
  [ -n "$TG_STARTED_AT" ] || return 0
  now="$(date +%s)"
  elapsed=$(( now - TG_STARTED_AT ))
  [ "$elapsed" -ge 0 ] || return 0
  printf ' за %d мин %d с' $(( elapsed / 60 )) $(( elapsed % 60 ))
}

cmd_start() {
  local text message_id
  echo "TG_STARTED_AT=$(date +%s)" >> "$GITHUB_ENV"
  text="🟡 <b>APK</b> · сборка начата
$(body)"
  message_id="$(send_message "$text")"
  if [ -n "$message_id" ]; then
    echo "TG_MESSAGE_ID=$message_id" >> "$GITHUB_ENV"
    log "sent start message $message_id"
  else
    log "start message not sent - the result will be sent as a new message"
  fi
}

cmd_finish() {
  local title text
  case "$1" in
    success) title="✅ <b>APK</b> · опубликован" ;;
    cancelled) title="⚪ <b>APK</b> · сборка отменена" ;;
    *) title="❌ <b>APK</b> · сборка упала" ;;
  esac
  text="$title$(duration)
$(body)"
  [ "$1" = "success" ] && text="$text
<a href=\"$DOWNLOAD_URL\">Страница скачивания</a>"

  if [ -n "$TG_MESSAGE_ID" ] && edit_message "$TG_MESSAGE_ID" "$text"; then
    log "edited message $TG_MESSAGE_ID"
    return 0
  fi
  if [ -n "$(send_message "$text")" ]; then
    log "sent result as a new message"
  fi
}

if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  log "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set - skipping"
  exit 0
fi

case "$1" in
  start) cmd_start ;;
  finish) cmd_finish "${2:-failure}" ;;
  *) log "usage: $0 start | finish <success|failure|cancelled>" ;;
esac
exit 0
