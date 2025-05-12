'use strict';
const common = require('../../common');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const binding = require(require.resolve(`./build/${common.buildType}/binding`));
assert.strictEqual(binding.hello(), 'world');

const binding2 = require(require.resolve(`./build/${common.buildType}/binding2`));
assert.strictEqual(binding2.hello(), 'world');

// Checks if the NAPI_EXPERIMENTAL warning is emitted only once.
{
  const warningMessage = '#warning "NAPI_EXPERIMENTAL is enabled. Experimental features may be unstable."';

  const gccLogFilePath = path.resolve(__dirname, './build_logs/build_gcc.log');
  const gccLogContent = fs.readFileSync(gccLogFilePath, 'utf8');

  const gccWarningCount = gccLogContent.split(warningMessage).length - 1;
  const gccHasWarning = gccLogContent.includes(warningMessage);

  assert.strictEqual(gccHasWarning, true, `Expected warning not found: "${warningMessage}"`);
  assert.strictEqual(gccWarningCount, 1, `Expected warning to appear exactly once, but found ${gccWarningCount} occurrences.`);

  const clangLogFilePath = path.resolve(__dirname, './build_logs/build_clang.log');
  const clangLogContent = fs.readFileSync(clangLogFilePath, 'utf8');

  const clangWarningCount = clangLogContent.split(warningMessage).length - 1;
  const clangHasWarning = clangLogContent.includes(warningMessage);

  assert.strictEqual(clangHasWarning, true, `Expected warning not found: "${warningMessage}"`);
  assert.strictEqual(clangWarningCount, 1, `Expected warning to appear exactly once, but found ${gccWarningCount} occurrences.`);
}
