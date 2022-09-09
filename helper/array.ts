export default function convertDataToLowerCase(arr:any[]){
    let a=arr.map((e)=>{
        return e.toLowerCase()
    });
    return a;

}