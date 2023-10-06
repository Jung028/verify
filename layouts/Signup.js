import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import React, { useState } from 'react';
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { useRouter } from 'next/router';



const Signup = ({ data }) => {

    
      const { frontmatter } = data;
      const { title } = frontmatter;
  

      const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


      const router = useRouter(); // Initialize the router

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Assuming you have a backend API endpoint for saving user data
        const apiUrl = '/api/signup'; // Replace with your actual API endpoint

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Data was successfully sent to the server
            alert('Sign Up Successful');
            // Optionally, you can reset the form here
            setFormData({
              name: '',
              subject: '',
              message: '',
            });
            // Redirect the user to a different page after a successful sign-up
            router.push('/about'); // Replace '/success' with the actual path you want to redirect to
          } else {
            // Handle errors
            alert('Sign Up failed, but you are getting there. Keep thinking, trying, learning');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while signing up');
        }
      };


    
  return (
    <section className="section">
      <Banner title={title} />

      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
        <div className="animate lg:col-5">
            <form
                onSubmit={handleSubmit}
                className="contact-form rounded-xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.05)]"
            >
                <h2 className="h4 mb-6">Sign Up</h2>
                <div className="mb-6">
                <label className="mb-2 block font-medium text-dark" htmlFor="name">
                    Name
                </label>
                <input
                    className="form-input w-full"
                    name="name"
                    placeholder="Full Name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                </div>

                <div className="mb-6">
                <label className="mb-2 block font-medium text-dark" htmlFor="subject">
                    Subject
                </label>
                <input
                    className="form-input w-full"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                />
                </div>
                <div className="mb-6">
                <label className="mb-2 block font-medium text-dark" htmlFor="message">
                    Message
                </label>
                <textarea
                    className="form-textarea w-full"
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
