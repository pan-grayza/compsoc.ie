import { Button } from '@/components/ui/button'
import { Mail, MapPin, Calendar } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { XIcon } from '@/components/icons/XIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { UsersRound } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-muted backdrop-blur-sm border-t border-border/50 mt-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
                    {/* About CompSoc */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <UsersRound className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">Compoc</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The University of Galway Computer Society - connecting computer science
                            enthusiasts through events, workshops, and community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 ">
                        <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                        <div className="space-y-2">
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                            >
                                <a href="/events" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Events
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                            >
                                <a href="/committee" className="flex items-center gap-2">
                                    <UsersRound className="w-4 h-4" />
                                    Committee
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                            >
                                <a href="/account" className="flex items-center gap-2">
                                    <GithubIcon className="w-4 h-4" />
                                    Account
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Áras na Mac Léinn, University of Galway
                                </span>
                            </div>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="w-fit justify-start ml-[-0.625rem]"
                            >
                                <a
                                    href="mailto:compsoc@socs.universityofgalway.ie"
                                    className="flex items-center gap-2"
                                >
                                    <Mail size={16} />
                                    compsoc@socs.universityofgalway.ie
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
                        <div className="flex gap-3">
                            <Button asChild size="sm" variant="outline" className="rounded-full">
                                <a
                                    href="https://x.com/UGCompsoc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <XIcon className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button asChild size="sm" variant="outline" className="rounded-full">
                                <a
                                    href="https://instagram.com/compsocgalway/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <InstagramIcon className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button asChild size="sm" variant="outline" className="rounded-full">
                                <a
                                    href="mailto:compsoc@socs.universityofgalway.ie"
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Everyone is welcome to join our community!
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} University of Galway Computer Society. All
                        rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <a href="/constitution" className="hover:text-foreground transition-colors">
                            Constitution
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
