// 'use client'

// const getRandomElements = (arr: any, numElements: number) => {
//     if (numElements > arr.length) {
//         console.log("Number of elements requested exceeds the array length.");
//     }
//     const shuffled = arr.slice().sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, numElements);
// }
// export default getRandomElements




"use client";

const getRandomElements = <T>(arr: T[], numElements: number): T[] => {
    if (numElements > arr.length) {
        console.warn("Number of elements requested exceeds the array length.");
        return arr.slice(); // Return a copy of the original array
    }

    // Fisher-Yates Shuffle Algorithm (More Efficient)
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, numElements);
};

export default getRandomElements;
