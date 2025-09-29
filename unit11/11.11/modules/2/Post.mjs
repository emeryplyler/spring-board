// default: export this class only
export default class Post
{
    title; // notes: it turns out you don't need to declare these properties as long as they're in the constructor
    content;
    constructor(title, content)
    {
        this.title = title;
        this.content = content;
    }
    publish()
    {
        console.log(`Published post! ${this.title}: ${this.content}`);
    }
}
