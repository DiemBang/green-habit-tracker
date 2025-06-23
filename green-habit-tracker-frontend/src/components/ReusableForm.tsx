import { useState } from "react";

interface ReusableFormProps {
  title: string;
  buttonText: string;
  onSubmit: (
    email: string,
    password: string,
    extraFieldValue?: string
  ) => Promise<any>;
  linkText: string;
  linkHref: string;
  linkDescription: string;
  extraField?: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  extraField,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const isValidEmail = email.includes("@") && email.includes(".");
    setEmailError(!isValidEmail);

    // Only submit if the email is valid
    if (isValidEmail) {
      onSubmit(email, password, extraField?.value);
    }
  };

  const handleEmailBlur = () => {
    // Validate email on blur
    const isValidEmail = email.includes("@") && email.includes(".");
    setEmailError(!isValidEmail);
  };

  return (
    <>
      <div className="w-full max-w-xs md:max-w-md p-6 sm:p-8 space-y-8 bg-cardWhite rounded-lg shadow-sm md:shadow-none">
        {/* Title */}
        <div className="text-center">
          <p>{title}</p>
        </div>

        {/* Form */}
        <form className="space-y-6" role="form" onSubmit={handleSubmit}>
          {/* Optional Extra Field */}
          {extraField && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                {extraField.label}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={extraField.value}
                onChange={(e) => extraField.onChange(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder={extraField.placeholder}
              />
            </div>
          )}
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              aria-required="true"
              aria-describedby="emailError"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur} // Validate on blur
              required
              className="w-full p-3 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
            {emailError && (
              <div
                id="emailError"
                className="text-red-500 text-sm mt-2"
                aria-live="assertive"
              >
                Please enter a valid email.
              </div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-black bg-buttonGreen rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {buttonText}
            </button>
          </div>
        </form>

        {/* Extra Options */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {linkDescription}{" "}
            <a href={linkHref} className="text-customGreen hover:underline">
              {linkText}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
