# Reporter Types: dot, spec, tap, landing, list, progress, doc, json
REPORTER = spec
TESTS = $(shell find tests/ -name '*Test.js')

test: test-unit

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(TESTS)
