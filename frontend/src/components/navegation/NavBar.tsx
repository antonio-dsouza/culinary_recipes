'use client'

import Image from "next/image";
import icon from "@assets/icon.jpg";
import logo from "@assets/icon.png";
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import ButtonRounded from "@components/button/ButtonRounded";
import { Home, UtensilsCrossed, BookOpen, Lock, Star } from 'lucide-react';

export default function NavBar({ ...props }) {
	const router = useRouter();
	const [menu, setMenu] = useState(false);
	const { data: session, status } = useSession();
	const menuRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const [route, setRoute] = useState(pathname);
	const appUrl = process.env.appUrl;

	async function logout() {
		await signOut({
			redirect: false
		});

		router.replace('/');
	}

	const toggleMenu = () => {
		setMenu(!menu);
	};

	useEffect(() => {
		const closeMenu = () => {
			setMenu(false);
		};

		const handleDocumentClick = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				closeMenu();
			}
		};

		if (menu) {
			document.addEventListener("click", handleDocumentClick);
		} else {
			document.removeEventListener("click", handleDocumentClick);
		}

		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, [menu]);

	return (
		<nav className="relative z-10 px-10 max-md:px-4 items-center flex justify-between backdrop-blur-md bg-gradient-to-br from-[rgba(255,255,255,0.50)] to-[rgba(255,255,255,0.50)] h-16 w-full">
			<div className="flex items-center gap-10 w-3/12 max-lg:gap-4">
				<Image className="h-10 w-auto max-sm:h-5" src={logo} alt="logo" />
				{/* <div className="bg-[#070606] w-[300px] max-lg:w-full h-10 flex items-center max-md:justify-end px-3 max-md:px-0 py-2 gap-2 rounded-md max-md:bg-transparent">
					<Search className="max-md:hidden" color="#0A0A0A" />
					<input className="bg-[#F5F5F5] w-full outline-none max-md:hidden" placeholder="Pesquisar" name="search" id="search"></input>
					<div className="max-w-xs:block md:hidden">
						<ButtonRounded
							active={route == 'pesquisar'}
							href="pesquisar"
							Icon={Search}
							text="Pesquisar"
						/>
					</div>
				</div> */}
			</div>
			<div className="flex w-6/12 max-md:w-7/12 justify-center items-center">
				<ButtonRounded
					active={route == '/'}
					href={`${appUrl}`}
					Icon={Home}
					text="Ínicio"
				/>
				<ButtonRounded
					active={route.includes('/categorias')}
					href={`${appUrl}categorias`}
					Icon={UtensilsCrossed}
					text="Categorias"
				/>
				<ButtonRounded
					active={route.includes('/receita')}
					href={`${appUrl}receitas`}
					Icon={BookOpen}
					text="Receitas"
				/>
				<ButtonRounded
					active={route == '/permissoes'}
					href={`${appUrl}permissoes`}
					Icon={Lock}
					text="Permissões"
				/>
				<ButtonRounded
					active={route == '/favoritos'}
					href={`${appUrl}favoritos`}
					Icon={Star}
					text="Favoritos"
				/>
			</div>
			{status === "loading" || status === "unauthenticated" ? (
				<div className="h-3/12 flex gap-2">
					<a href="login" className="flex justify-center items-center w-20 h-full bg-[rgba(225,152,83,0.7)] rounded-lg text-white hover:bg-[rgba(207,140,76,0.7)]">Login</a>
					<a href="register" className="flex justify-center items-center w-32 h-full border-[1px] border-[rgba(225,152,83,0.7)] text-[rgba(225,152,83,0.7)] rounded-lg hover:bg-[rgba(207,140,76,0.7)] hover:border-[rgba(207,140,76,0.7)] hover:text-white">Registrar-se</a>
				</div>
			) : (
				<div className="w-3/12 flex justify-end items-center gap-2 max-md:w-2/12" >
					<div className="relative inline-block text-left" ref={menuRef}>
						<div className="flex gap-3 justify-center items-center cursor-pointer" onClick={toggleMenu}>
							<Image className="h-10 w-10 rounded-full" src={icon} alt="logo" />
							<div className="max-md:hidden">
								<h1 className="text-sm">{session?.user.name}</h1>
								<p className="text-xs">Usuário</p>
							</div>
						</div>
						{menu && (
							<div className="absolute z-20 mt-3 w-56 right-0 rounded-md bg-gradient-to-br from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,1)] ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1" role="none">
									<a href="#" className="text-gray-700 hover:bg-[#ffeedf] hover:rounded-lg block px-4 py-2 text-sm">Perfil</a>
									<a href="#" className="text-gray-700 hover:bg-[#ffeedf] hover:rounded-lg block px-4 py-2 text-sm">Suporte</a>
									<form method="POST" action="#">
										<button type="submit" onClick={logout} className="text-gray-700 hover:bg-[#ffeedf] hover:rounded-lg block w-full px-4 py-2 text-left text-sm">Deslogar</button>
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}