import { connect } from "react-redux"
import Login from "../../pages/login/Login"
import { login } from "../figures/user"

const mapActionsToProps = { login }

export default connect(null, mapActionsToProps)(Login)