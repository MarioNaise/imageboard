// const firstComponent = {
//     data() {
//         return {
//             heading: "first component",
//             count: 1,
//             greetee: "",
//         };
//     },
//     props: ["passingProp", "selected-mood"],
//     mounted() {
//         // console.log("first component mounted");
//         setTimeout(() => {
//             this.greetee = "Cayenne";
//         }, 3000);
//         // console.log("accessing passingProp val", this.passingProp);
//         console.log("this.selectedMood ", this.selectedMood);
//     },
//     methods: {
//         increaseCount() {
//             // console.log("user wants to up count");
//             this.count++;
//         },
//         notifyParent() {
//             console.log("I want the parent to do smth");
//             this.$emit("close");
//         },
//     },
//     template: `<div>
//                     <h1 @click="notifyParent">tell the parent to do smth</h1>
//                     <h1>I am your {{heading}}</h1>
//                     <h2>Hello {{greetee}}</h2>
//                     <h2>count is: {{count}}</h2>
//                     <button @click="increaseCount">increase count</button>
//                     <button @click="count--">decrease count</button>
//                 </div>`,
// };

// export default firstComponent;
