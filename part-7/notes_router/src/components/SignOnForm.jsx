import { useField } from "./customHook";

const SignOnForm = () => {

    const username = useField('text')
    const name = useField('text')
    const surname = useField('text')
    const age = useField('text')
    const telephone = useField('tel')
    const email = useField('email')
    const password = useField('password')

    return (
        <form>
            <div className="d">
                Username: <input {...username} className="username" /> 
            </div>
            <div className="d">
                Name: <input {...name} className="name" />
            </div>
            <div className="d">   
                Surname: <input {...surname} className="surname" />
            </div>
            <div className="d">
                Age: <input {...age} className="age" />
            </div>
            <div className="d">
                Telephone: <input {...telephone} className="telephone" />
            </div>
            <div className="d">
                Email: <input {...email} className="email" />
            </div>
            <div className="d">
                Password: <input {...password} className="password" />
            </div>               
        </form>
    )

}

export default SignOnForm


