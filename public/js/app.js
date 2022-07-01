import * as Vue from "./vue.js";
// import firstComponent from "./first-component.js";
// importing our components from our files requires us to use the file extension!!!

Vue.createApp({
    data() {
        return {
            // name: "Cayenne",
            // visible: true,
            images: [],
            moods: [
                { id: 1, emoji: "😊" },
                { id: 2, emoji: "😌" },
                { id: 3, emoji: "🤗" },
            ],
            moodSelected: null,
        };
    },
    // data ends here

    components: {
        // "first-component": firstComponent,
    },

    mounted() {
        // this is the location for us to ask if there are
        // any images to retrieve in our database!

        // console.log("my vue app has mounted!");
        // console.log("this: ", this);
        // console.log("this.cities: ", this.cities);

        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("response from /images: ", data);
                this.images = data;
            });
    },

    methods: {
        // this is where we define all of our functions
        // myFirstFunction: function (city) {
        //     console.log(
        //         "myFirstFunction is running and the city name is ==> ",
        //         city
        //     );
        // },
        handleSubmit(e) {
            // e.preventDefault();
            console.log("handle Submit");
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((result) => {
                    // console.log("result app.js", result);
                    return result.json();
                })
                .then((data) => {
                    console.log("data app.js", data);
                    this.images.unshift(data.newImage);
                    // console.log(this.images);
                })
                .catch((err) => {
                    console.log("err in handleSubmit", err);
                });
        },
        // selectMood(id) {
        //     console.log("id clicked on: ", id);
        //     this.moodSelected = id;
        // },
        // closeFirstComponent() {
        //     console.log("the component would like have you made disappear");
        // },
    },
}).mount("#main");
