import { getCrafts } from "@/app/actions"
import MessageCard from "../../messageCard";

export default async function Crafts() {

    const crafts = await getCrafts();
    
    return (
        <div>
              <div>
                    { crafts &&
                        crafts.slice().reverse().map((craft) => {
                            return(
                                <MessageCard
                                    key={ craft._id }
                                    content={ craft.content }
                                    id={ craft._id }
                                    year = { craft.year &&  craft.year }
                                    branch = { craft.branch && craft.branch }
                                    replies = { craft.responses ? craft.responses.length : 0 }
                                />
                            )
                        })
                    }
                </div>
        </div>
    )
}