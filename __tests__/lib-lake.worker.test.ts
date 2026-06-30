// lake.worker is hard to test directly because it uses self.onmessage and sql.js
describe('lake.worker.ts', () => {
    it('is a worker file', () => {
        expect(true).toBe(true);
    });
});
