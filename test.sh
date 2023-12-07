#!/usr/bin/env bash
set -eou pipefail

for test in test/*.test.ts; do
  echo "Running $test"
  bash -c "npx tsx $test"
done
