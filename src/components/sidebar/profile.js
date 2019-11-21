import React from "react"
import Image from "gatsby-image"

const Profile = ({avatar, author, description}) => {

    return (
        <section id = "introduce">
            <Image
                fixed={avatar.childImageSharp.fixed}
                alt={author}
            />
            <h2 className = "author">{author}</h2>
            <p>{description}</p>
        </section>
    )
}
export default Profile