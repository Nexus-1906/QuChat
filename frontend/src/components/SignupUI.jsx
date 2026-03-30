import { useContext } from "react";
import OnboardContext from "../contexts/OnboardContext";
import WindowLoading from "./WindowLoading";
import logo from "../assets/QuChat.png";

export default function SignupUI() {
	const { 
        signup, username, setUsername,
        password, setPassword, checkPasswordLength,
        windowLoading, setIsLogin, showPasswordConstraints,
        showLengthConstraint, showSpCharConstraint, showAlpNumConstraint
    } = useContext(OnboardContext);

	return (
		<div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
			<div className="card shadow-sm p-4" style={{ maxWidth: 520, width: "94%" }}>
				<div className="text-center mb-3">
					<img src={logo} alt="QuChat" style={{ height: 64, objectFit: "contain" }} />
				</div>

				<h4 className="mb-3 text-center">Create an account</h4>

				<div className="mb-3">
					<label className="form-label">Username</label>
					<input
						type="text"
						className="form-control"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Choose a username"
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => { setPassword(e.target.value); checkPasswordLength(); }}
						placeholder="Choose a password"
					/>
				</div>

				{showPasswordConstraints && (
					<div className="mb-3">
						<div className="small text-muted">Missing these password requirements:</div>
						<ul className="list-unstyled mb-0">
                            {showLengthConstraint && 
							    <li className='text-danger'>At least 6 characters</li>}

                            {showAlpNumConstraint && 
							    <li className='text-danger'>Must contain letters and numbers</li>}

                            {showSpCharConstraint &&    
							    <li className='text-danger'>Must contain special characters</li>}
						</ul>
					</div>
				)}

				<div className="d-grid gap-2">
					<button className="btn btn-success" onClick={signup} disabled={windowLoading}>
						Sign up
					</button>
					<button className="btn btn-outline-secondary" onClick={() => setIsLogin(true)} disabled={windowLoading}>
						Back to login
					</button>
				</div>
			</div>

			{ windowLoading && <WindowLoading message="Creating account..." /> }
		</div>
	);
}

