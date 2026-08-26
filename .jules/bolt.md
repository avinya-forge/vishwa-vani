## 2026-08-24 - [Jest Console Error Suppression]
**Learning:** Expected error paths in API tests were logging error output during `npm test`, cluttering the runner logs and causing noisy test results.
**Action:** Always wrap expected negative tests containing `console.error` logs with a `jest.spyOn(console, 'error').mockImplementation(() => {})` in `beforeEach` and `mockRestore()` in `afterEach` to maintain clear and meaningful CLI output for actual regressions.
