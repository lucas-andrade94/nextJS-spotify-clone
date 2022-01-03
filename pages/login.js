import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <section className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="Spotify Logo"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18d860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
      <div className="text-red-500 pt-6 text-center">
        <p>To use the application:</p>
        <p>Username: spotifytestuser22@gmail.com</p>
        <p>Password: spotifyuser</p>
        <p className="pt-3">
          How to use: Login using this Spotify Test User and open in your device
          the spotify web application and start a music.
        </p>
        <p>
          (That's necessary because Spotify API doesn't recognize this
          application as a device)
        </p>
        <p>
          After that, you can open the playlists and see the songs list, but the
          Spotify API requires a Premium Account to listen the songs.
        </p>
      </div>
    </section>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
