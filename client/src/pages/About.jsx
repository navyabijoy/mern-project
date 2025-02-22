export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover who we are and what we do.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        <img 
          src="/about-image.jpg" 
          alt="About Us" 
          className="w-full h-[300px] object-cover rounded-xl shadow-lg"
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We are dedicated to providing the best products and services. 
            Our goal is to bring quality and innovation together to create meaningful experiences.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a passion for excellence, we work hard to deliver exceptional value to our customers. 
            Join us on this journey and be a part of something amazing.
          </p>
        </div>
      </div>

    </div>
  );
}
