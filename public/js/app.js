import * as Vue from "./vue.js";
// import firstComponent from "./first-component.js";
// importing our components from our files requires us to use the file extension!!!
import imageComponent from "./image-component.js";

Vue.createApp({
    data() {
        return {
            // name: "Cayenne",
            // visible: true,
            images: [],
            imageId: null,
            smallestId: null,
            firstPicture: null,
            // moods: [
            //     { id: 1, emoji: "😊" },
            //     { id: 2, emoji: "😌" },
            //     { id: 3, emoji: "🤗" },
            // ],
            // moodSelected: null,
        };
    },
    components: {
        "image-component": imageComponent,
    },

    mounted() {
        // this is the location for us to ask if there are
        // any images to retrieve in our database!

        // console.log("my vue app has mounted!");
        // console.log("this: ", this);

        if (parseInt(location.pathname.slice(1))) {
            this.imageId = location.pathname.slice(1);
        } else {
            history.replaceState({}, "", `/`);
        }

        window.addEventListener("popstate", () => {
            this.imageId = location.pathname.slice(1);
        });

        fetch("/lowestId")
            .then((resp) => resp.json())
            .then((data) => {
                this.firstPicture = data[0].id;
            });

        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("response from /images in app.js: ", data);
                this.images = data;
                // console.log("this.images: ", this.images);
                this.smallestId = this.images[this.images.length - 1].id;
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
            // console.log("handle Submit");
            fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            })
                .then((result) => {
                    // console.log("result app.js", result);
                    return result.json();
                })
                .then((data) => {
                    // console.log("data app.js", data);
                    this.images.unshift(data.newImage);
                    // console.log(this.images);
                })
                .catch((err) => {
                    console.log("err in handleSubmit", err);
                });
        },
        loadImages() {
            fetch("/loadImages/" + this.smallestId)
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    // console.log(data);
                    data.forEach((element) => {
                        this.images.push(element);
                    });
                    this.smallestId = this.images[this.images.length - 1].id;
                })
                .catch((err) => {
                    console.log("err in loadImages app.js", err);
                });
        },
        // selectMood(id) {
        //     console.log("id clicked on: ", id);
        //     this.moodSelected = id;
        // },
        // closeFirstComponent() {
        //     console.log("the component would like have you made disappear");
        // },
        showImage(id) {
            // console.log(id);
            this.imageId = id;
            history.pushState({}, "", `/${id}`);
        },
        closeImage() {
            this.imageId = null;
            history.pushState({}, "", `/`);
        },
    },
}).mount("#main");
