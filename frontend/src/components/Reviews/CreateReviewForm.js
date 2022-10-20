import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

export default function CreateReviewForm(){

    const history = useHistory()
    const dispatch = useDispatch()

    


    return (
        <div>
            <h2>This is CreateReviewForm component</h2>
            <form>
                <div>
                    <textarea placeholder="Leave your reviews"></textarea>
                </div>
                <div>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit your review.</button>
                </div>
            </form>
        </div>
    )
}
