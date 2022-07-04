const commentComponent = {
    data() {
        return {
            comments: [],
            comment: "",
            username: "",
        };
    },
    props: ["imageProp"],
    mounted() {
        // console.log(this.imageProp);
        fetch(`/comments/${this.imageProp}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.comments = data;
                // console.log(this.comments);
            })
            .catch((err) => {
                console.log("err in image-component mounted fetch#2: ", err);
            });
    },
    methods: {
        send() {
            fetch("/insertComment", {
                method: "POST",
                body: JSON.stringify({
                    image_id: this.imageProp,
                    comment: this.comment,
                    username: this.username,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((result) => {
                    // console.log(result);
                    return result.json();
                })
                .then((data) => {
                    // console.log("data comment-component", data.newComment);
                    this.comments.unshift(data.newComment);
                })
                .catch((err) => {
                    console.log("err in fetch comments-component", err);
                });
        },
    },
    template: `<form method="post" action="/insertComment">
                    <h3>Add a comment:</h3>
                    <input v-model="username" name="username" placeholder="Username" required>
                    <input v-model="comment" name="comment" placeholder="Comment" required>
                    <button @click.prevent="send" type="submit">Submit</button>
                </form>

                <div class="comments" v-for="comment in comments">
                    <h4>{{comment.username}}: {{comment.comment}}</h4>
                    <p class="time">{{comment.created_at}}</p>
                </div>`,
};

export default commentComponent;
