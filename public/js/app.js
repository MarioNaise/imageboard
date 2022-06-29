import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "Cayenne",
            visible: true,
            images: [],
        };
    },
    // data ends here

    mounted() {
        // this is the location for us to ask if there are
        // any images to retrieve in our database!

        // console.log("my vue app has mounted!");
        // console.log("this: ", this);
        // console.log("this.cities: ", this.cities);

        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("response from /cities: ", data);
                this.images = data;
                // console.log(data);
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
    },
}).mount("#main");
