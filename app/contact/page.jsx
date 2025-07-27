'use client'
import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Layout from "../components/layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHackerrank, faLinkedin, faGithub, } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_h57f3ir",
        "template_1mpdhht",
        formData,
        "mTpbRvRtUt7XAy-aJ"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSent(true);
          setError("");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("FAILED...", err);
          setError("Failed to send message. Try again later.");
        }
      );
  };

  return (
      <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8">
          {" "}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Contact Me</h1>
          <Card className="max-w-2xl mx-auto">
          <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Let's get in Touch!</CardTitle>
          <CardDescription className="text-sm md:text-base">Fill out the form below to send me a message.</CardDescription>{" "}
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="name" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="email" placeholder="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} rows={5} required/>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full hover:cursor-pointer" onClick={handleSubmit}>Send Message</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Socials</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex mb-6 md:mb-0">
          <Link href="https://github.com/sudhu01" target='_blank'><FontAwesomeIcon icon={faGithub}  className="w-20 h-20 text-gray-600 hover:cursor-pointer mr-10 hover:scale-120 transition-transform duration-300" size="4x" /></Link>
          <Link href="https://www.linkedin.com/in/sudharsan-balajee/" target='_blank'><FontAwesomeIcon icon={faLinkedin}  className="w-20 h-20 text-blue-800 hover:cursor-pointer mr-10 hover:scale-120 transition-transform duration-300" size="4x" /></Link>
          <Link href="https://www.hackerrank.com/profile/jacksonjay451" target='_blank'><FontAwesomeIcon icon={faHackerrank}  className="w-20 h-20 text-green-700 hover:cursor-pointer hover:scale-120 transition-transform duration-300" size="4x" /></Link>
        </div>
        
          <div className="space-y-4">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8 text-blue-400 mr-4 mt-1" />
              <div>
                <p>sudharsanbalajee01@gmail.com</p>
                <p>sudharsan.balajee2023@vitstudent.ac.in</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="w-8 h-8 text-green-900 mr-4" />
              <p>+91 73582 17800</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>

    
  )
}

