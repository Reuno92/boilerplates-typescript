import makeMeAString from "../src";

describe("Testology", () => {

    it("should always return a string with a random number", () => {
        const NUMBER = Math.random() * 1000;
        expect(typeof makeMeAString(NUMBER)).toBe("string");
    });

    it("should return human readable full date with a Date", () => {
        const TARGET_DATE = "jeudi 7 avril 2022";
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

        console.log("TEST INSIDE", TEST);

        expect(typeof TEST).toBe("string");
        expect(makeMeAString(TEST)).toBe(TARGET_DATE);
    });
});