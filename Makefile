# Reporter Types: dot, spec, tap, landing, list, progress, doc, json
REPORTER = spec
UNIT_TESTS = $(shell find tests/unit/ -name '*Test.js')
INTEGRATION_TESTS = $(shell find tests/integration -name '*Test.js')
ACCEPTANCE_TESTS = $(shell find tests/acceptance -name '*Test.js')

test: test-unit test-integration

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(UNIT_TESTS)

test-integration:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(INTEGRATION_TESTS)

acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(ACCEPTANCE_TESTS)
