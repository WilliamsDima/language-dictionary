NODE_VERSION := 22.22.2
NVM_SH := $(HOME)/.nvm/nvm.sh

# nvm is a shell function, not a binary, so every target that needs it
# must source nvm.sh inside its own recipe shell (each recipe line runs
# in a fresh, non-interactive shell that doesn't inherit `nvm` otherwise).
WITH_NVM := source $(NVM_SH) && nvm use $(NODE_VERSION)

.PHONY: dev android ios start

## Run Metro and the Android build/install in the same terminal, live,
## with "[metro]"/"[android]" output prefixes. `-k` kills both processes
## together on Ctrl+C or as soon as either one exits.
dev: android

android:
	@bash -lc '$(WITH_NVM) && yarn concurrently -k -n metro,android -c blue,green "yarn start" "yarn android"'

ios:
	@bash -lc '$(WITH_NVM) && yarn concurrently -k -n metro,ios -c blue,green "yarn start" "yarn ios"'

## Just Metro, in the foreground, with the right node version.
start:
	@bash -lc '$(WITH_NVM) && yarn start'
