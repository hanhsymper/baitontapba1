//pactory

// function Membership(name) {
//   this.name = name;
//   this.type = "Number";
// }
// function Manager(name) {
//   this.name = name;
//   this.type = "Manager";
// }
// function Factory() {
//   this.getPeople = (name, type) => {
//     switch (type) {
//       case 1:
//         return new Membership(name);
//       case 2:
//         return new Manager(name);
//     }
//   };
// }
// function inPeople() {
//   console.log("Name " + this.name + " Type " + this.type);
// }
// const people = new Factory();
// const c = [];
// c.push(people.getPeople("hanh", 1));
// c.map((e) => {
//   inPeople.call(e);
// });

//singleton
// class People {
//   constructor() {
//     if (People.instance == null) {
//       this.numbers = [];
//       People.instance = this;
//     }
//     return People.instance;
//   }
//   create(number) {
//     this.numbers.push(number);
//     console.log(`People: ${number}`);
//   }
//   countPeple() {
//     console.log(this.numbers.length + " people");
//   }
// }

// let people = new People();
// // Object.freeze(people);
// people.countPeple();
// people.create("hanh");
// people.countPeple();

function tong(tong){
  let i="";
  for(let j=1;j<=tong;j++){
    if(j==tong){
        i+=j
    }else{
      i +=j +"+";
    }
  }
  return i;
}
console.log(tong(5));
