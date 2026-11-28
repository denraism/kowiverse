import { Mail } from "lucide-react";
import { footerContent } from "@/config/content";
import { CONTACT_EMAIL } from "@/config/contact";
import { navItems, site } from "@/config/site";
import { socialLinks, type SocialPlatform } from "@/config/social";
import { buildWhatsAppUrl, getValidExternalUrl, isValidEmail } from "@/lib/links";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./icons/BrandIcons";
import { Logo } from "./Logo";

const socialIcons: Record<SocialPlatform, (p: { className?: string }) => React.JSX.Element> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

const headingClass = "text-sm font-medium text-fg";
const linkClass = "inline-flex min-h-9 items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-200 hover:text-accent-2";

export function Footer() {
  const socials = socialLinks
    .map((s) => ({ ...s, href: getValidExternalUrl(s.url) }))
    .filter((s): s is typeof s & { href: string } => Boolean(s.href));
  const whatsappUrl = buildWhatsAppUrl();
  const email = isValidEmail(CONTACT_EMAIL) ? CONTACT_EMAIL.trim() : "";
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line bg-bg pb-28 pt-16 sm:pb-16 md:pt-20">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <a href="#home" aria-label="KowiVerse — kembali ke atas" className="inline-block rounded-lg">
              <Logo />
            </a>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{footerContent.description}</p>
            <p className="mt-5 text-sm text-mint">{site.tagline}</p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className={headingClass}>{footerContent.navTitle}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>{footerContent.socialTitle}</h2>
            {socials.length ? (
              <ul className="mt-4 flex flex-col">
                {socials.map((s) => {
                  const Icon = socialIcons[s.platform];
                  return (
                    <li key={s.platform}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${s.label} KowiVerse (membuka tab baru)`}>
                        <Icon className="size-4" />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-subtle">{footerContent.socialFallback}</p>
            )}
          </div>

          <div>
            <h2 className={headingClass}>{footerContent.contactTitle}</h2>
            {whatsappUrl || email ? (
              <ul className="mt-4 flex flex-col">
                {whatsappUrl ? (
                  <li>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <WhatsAppIcon className="size-4 text-whatsapp" />
                      WhatsApp
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                      <Mail className="size-4 shrink-0" aria-hidden="true" />
                      {email}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-subtle">{footerContent.contactFallback}</p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {footerContent.rights}
          </p>
          <p>{footerContent.bottomNote}</p>
        </div>
      </div>
    </footer>
  );
}
