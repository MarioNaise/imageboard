import commentComponent from "./comment-component.js";

const imageComponent = {
    data() {
        return {
            currentImage: {},
            comments: [],
        };
    },
    components: {
        "comment-component": commentComponent,
    },
    props: ["imageProp"],
    mounted() {
        // console.log("image-component mounted");
        // console.log(this.imageProp);
        fetch("/images/" + this.imageProp)
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("response from /images in image component: ", data);
                this.currentImage = data;
                // return currentImage;
            })
            .catch((err) => {
                console.log("err in image-component mounted fetch: ", err);
            });
    },
    methods: {
        closeImage() {
            this.$emit("close");
        },
    },
    template: `<div id="overlay">
                    <div id="modal">
                        <div id="closeImage"  @click="closeImage">
                            <span class="material-symbols-outlined">close</span>
                        </div>
                        <img v-if="this.currentImage.url" :src="this.currentImage.url" alt="currentImage">
                        <h2 v-else="!this.currentImage.url">Image not found.</h2>
                        <h2 v-if="this.currentImage.url" >{{this.currentImage.title}}</h2>
                        <p v-if="this.currentImage.url" >{{this.currentImage.description}}</p>
                        <p v-if="this.currentImage.url" class="time">Uploaded by {{this.currentImage.username}} on {{this.currentImage.created_at}}</p>
                        <comment-component v-if="this.currentImage.url" :image-prop="imageProp"></comment-component>
                    </div>
                </div>`,
};

export default imageComponent;
