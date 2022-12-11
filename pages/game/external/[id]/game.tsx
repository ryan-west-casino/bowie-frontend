import { useRouter } from "next/router";
import Link from "next/link";
interface GameProps{
    InitData: Object;
}
export default function Game({InitData}: GameProps) {
	const GameSource = window.atob(InitData.data.extra_init_function.game_html);
	const GameLink = InitData.data.extra_init_function.link;
    return (
            <div>
				  <iframe defer="" id="iframe" frameBorder="0" src="about:blank" srcdoc={GameSource} />
				  <style jsx>{`
				        iframe {
				          height: 100vh;
						  width: 100%;
				        }
				      `}
				</style>



    		</div>
);
}