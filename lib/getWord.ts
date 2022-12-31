

const getWord=(difficulty:string,classifiedWords:any)=>{

    // type ObjectKey = keyof typeof classifiedWords;
    // const typeSafekey = difficulty as ObjectKey;
    const words:string[]=classifiedWords[difficulty];

    return words[Math.floor(Math.random() * words?.length)];
}

export default getWord;