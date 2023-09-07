import {useAuth0} from '@auth0/auth0-react'

export default function LogoutButton() {
	const { logoutWithRedirect } = useAuth0()
	return (<button onClick={()=>logoutWithRedirect()}> Log In </button>)
}