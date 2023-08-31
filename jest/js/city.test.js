function initializeCityDB() {

}
function clearCityDB() {

}
function hasCity() {
    return true
}

beforeAll(() => {
    return initializeCityDB()
});

afterAll(() => {
    return clearCityDB()
});

test('含有深圳', () => {
    expect(hasCity('深圳')).toBeTruthy()
});