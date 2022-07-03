const imageComponent = {
    data() {
        return {
            currentImage: {},
        };
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
                        <img :src="this.currentImage.url" alt="currentImage">
                        <h2>{{this.currentImage.title}}</h2>
                        <p>{{this.currentImage.description}}</p>

                        <p id="time">Uploaded by {{this.currentImage.username}} on {{this.currentImage.created_at}}</p>
                    </div>
                </div>`,
};

export default imageComponent;
