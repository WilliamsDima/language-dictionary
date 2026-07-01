NODE_VERSION := 22.22.2
NVM_SH := $(HOME)/.nvm/nvm.sh
METRO_STATUS_URL := http://localhost:8081/status

# nvm is a shell function, not a binary, so every target that needs it
# must source nvm.sh inside its own recipe shell (each recipe line runs
# in a fresh, non-interactive shell that doesn't inherit `nvm` otherwise).
WITH_NVM := source $(NVM_SH) && nvm use $(NODE_VERSION)

.PHONY: dev android ios start

## Run Metro and the Android build/install in the same terminal, live,
## with "[metro]"/"[android]" output prefixes. `-k` kills both processes
## together on Ctrl+C or as soon as either one exits.
##
## Safe to combine with a Metro already running in another terminal
## (e.g. from `make start`, or left over from a previous run): each
## target checks localhost:8081 first and reuses it instead of trying
## to bind a second Metro on the same port (which used to fail with
## EADDRINUSE and, via `concurrently -k`, take `yarn android`/`yarn ios`
## down with it). You never need to run `make start` and `make android`
## together on purpose — either one alone is enough — but doing so is
## now harmless.
dev: android

android:
	@bash -lc '\
		$(WITH_NVM); \
		if curl -s $(METRO_STATUS_URL) > /dev/null; then \
			echo "Metro already running on :8081, reusing it."; \
			yarn android; \
		else \
			yarn concurrently -k -n metro,android -c blue,green "yarn start" "yarn android"; \
		fi \
	'

ios:
	@bash -lc '\
		$(WITH_NVM); \
		if curl -s $(METRO_STATUS_URL) > /dev/null; then \
			echo "Metro already running on :8081, reusing it."; \
			yarn ios; \
		else \
			yarn concurrently -k -n metro,ios -c blue,green "yarn start" "yarn ios"; \
		fi \
	'

## Just Metro, in the foreground, with the right node version.
start:
	@bash -lc '$(WITH_NVM) && yarn start'
