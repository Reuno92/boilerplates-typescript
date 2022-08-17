import makeMeAString from "../src";

describe("Testology", () => {

    it("should always return a string with a random number", () => {
        const NUMBER = Math.random() * 1000;
        expect(typeof makeMeAString(NUMBER)).toBe("string");
    });

    xit("should return a string of 4 or less with a randomized number 4 or less", () => {
        const FOUR_OR_LESS = Math.random() * 4;
        expect(makeMeAString(FOUR_OR_LESS)).toBeLessThanOrEqual(4);
    });

    xit("should return a string of 5 or more with a randomized number 5 or more ", () => {
        const FIVE_OR_GREATER = (Math.random() + 5) * 5;
        expect(makeMeAString(FIVE_OR_GREATER)).toBeGreaterThanOrEqual(5);
    });

    xit("should return human readable full date with a Date", () => {
        const TARGET_DATE = "Jeudi 7 Avril 2022";
        const DATE = new Date("04/07/2022");
        const TEST = makeMeAString(
            DATE, 
            {
                language: "fr",
                country : "FR",
                weekday : "long",
                year    : "numeric",
                month   : "long",
                day     : "numeric"
            }
        );

        expect(typeof TEST).toBe("string");
        expect(makeMeAString(TEST)).toBe(TARGET_DATE);
    });
});