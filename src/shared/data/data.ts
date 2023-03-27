import amyrobson from "../../assets/images/avatars/image-amyrobson.png"
import maxblagun from "../../assets/images/avatars/image-maxblagun.png"
import ramsesmiron from "../../assets/images/avatars/image-ramsesmiron.png"
import juliusomo from "../../assets/images/avatars/image-juliusomo.png"
// initial comments data
export const commentsData = [
    {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "commentingDate": "23 November 2021",
        "upvotes": 12,
        "userName": "amyrobson",
        "profilePicture": amyrobson,
        "isCurrentUSer": false,
        "voted": false,
        "replies": []
    },
    {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "commentingDate": "5 December 2021",
        "upvotes": 5,
        "userName": "maxblagun",
        "profilePicture": maxblagun,
        "isCurrentUSer": false,
        "voted": false,
        "replies": [
            {
                "id": 3,
                "content": "@maxblaugn, If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                "commentingDate": "18 December 2021",
                "upvotes": 4,
                "userName": "ramsesmiron",
                "profilePicture": ramsesmiron,
                "isCurrentUSer": false,
                "voted": false,
                "replies": []
            },
            {
                "id": 4,
                "content": "@ramsesmiron, I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                "commentingDate": "30 December 2021",
                "upvotes": 2,
                "userName": "juliusomo",
                "profilePicture": juliusomo,
                "isCurrentUSer": true,
                "replies": []
            }
        ]
    }
]