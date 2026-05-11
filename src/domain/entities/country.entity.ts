export class Country {
    constructor(
        public id: string, // UUID
        public name: string,
        public pictureUrl: string,
        public tierMale: number, // 1 = easy, 2 = medium, 3 = hard
        public tierFemale: number, // 1 = easy, 2 = medium, 3 = hard
    ) { }
}
