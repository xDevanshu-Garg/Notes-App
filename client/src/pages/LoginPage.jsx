function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-6 border rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border p-3 rounded"
          />

          <button
            className="w-full bg-black text-white py-3 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;