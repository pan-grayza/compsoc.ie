import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, useRef, useCallback } from 'react'
import { getEvents, AllEventsType, EventType, paginateEvents } from '@/services/events'
import {
    Post,
    PostHeader,
    PostTitle,
    PostMeta,
    PostContent,
    PostFooter,
} from '@/components/ui/post'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/(menu)/events')({
    component: RouteComponent,
})

function RouteComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [allEvents, setAllEvents] = useState<AllEventsType>({} as AllEventsType)
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
    const [hasLoaded, setHasLoaded] = useState(false)

    // Pagination state
    const [upcomingPage, setUpcomingPage] = useState(0)
    const [pastPage, setPastPage] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMoreUpcoming, setHasMoreUpcoming] = useState(true)
    const [hasMorePast, setHasMorePast] = useState(true)

    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const events = await getEvents()
                setAllEvents(events)
                setHasLoaded(true)
            } catch (e) {
                console.error('Error fetching events:', e)
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [])

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loadingMore && hasLoaded) {
                    loadMore()
                }
            },
            { threshold: 0.1 },
        )

        observerRef.current = observer

        if (loadingRef.current) {
            observer.observe(loadingRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [loadingMore, hasLoaded, activeTab, upcomingPage, pastPage, hasMoreUpcoming, hasMorePast])

    const loadMore = useCallback(async () => {
        if (loadingMore) return

        setLoadingMore(true)

        // Simulate loading delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (activeTab === 'upcoming') {
            if (hasMoreUpcoming) {
                setUpcomingPage((prev) => prev + 1)
                setHasMoreUpcoming(
                    allEvents.upcoming && (upcomingPage + 1) * 7 < allEvents.upcoming.length,
                )
            }
        } else {
            if (hasMorePast) {
                setPastPage((prev) => prev + 1)
                setHasMorePast(allEvents.past && (pastPage + 1) * 7 < allEvents.past.length)
            }
        }

        setLoadingMore(false)
    }, [loadingMore, activeTab, hasMoreUpcoming, hasMorePast, allEvents, upcomingPage, pastPage])

    // Reset pagination when switching tabs
    useEffect(() => {
        setUpcomingPage(0)
        setPastPage(0)
        setHasMoreUpcoming(true)
        setHasMorePast(true)
    }, [activeTab])

    // Decode HTML special characters
    const htmlDecode = (content: string) => {
        const textarea = document.createElement('textarea')
        textarea.innerHTML = content
        return textarea.value
    }

    const renderEvent = (event: EventType) => {
        return (
            <Post key={`${event.EventID}-${event.EventDetailsID}`} className="mb-6">
                <PostHeader>
                    <PostTitle>{htmlDecode(event.Title)}</PostTitle>
                    <PostMeta>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.DatetimeFormatted}</span>
                        </div>
                        {event.Location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{event.Location}</span>
                            </div>
                        )}
                    </PostMeta>
                </PostHeader>
                <PostContent>
                    <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: event.DangerousDescriptionHTML }}
                    />
                </PostContent>
                <PostFooter>
                    <Button asChild size="sm" variant="outline">
                        <a
                            href={event.EventURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View / Join Event
                        </a>
                    </Button>
                </PostFooter>
            </Post>
        )
    }

    // Skeleton for a post
    const PostSkeleton = () => (
        <Post className="mb-6 w-full">
            <PostHeader>
                <PostTitle>
                    <Skeleton className="h-6 w-2/3 mb-2" />
                </PostTitle>
                <PostMeta>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </PostMeta>
            </PostHeader>
            <PostContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/6" />
            </PostContent>
            <PostFooter>
                <Skeleton className="h-8 w-32 rounded-full" />
            </PostFooter>
        </Post>
    )

    const getCurrentEvents = () => {
        if (activeTab === 'upcoming') {
            // Get all events up to the current page
            const allUpcoming = allEvents.upcoming || []
            const endIndex = (upcomingPage + 1) * 7
            return allUpcoming.slice(0, endIndex)
        } else {
            // Get all events up to the current page
            const allPast = allEvents.past || []
            const endIndex = (pastPage + 1) * 7
            return allPast.slice(0, endIndex)
        }
    }

    const getAllEventsForTab = () => {
        if (activeTab === 'upcoming') {
            return allEvents.upcoming || []
        } else {
            return allEvents.past || []
        }
    }

    const renderEventsList = (emptyMessage: string, emptyIcon: React.ReactNode) => {
        if (!hasLoaded && isLoading) {
            // Show 2 skeleton posts during initial loading
            return (
                <div className="flex flex-col gap-4 py-12">
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )
        }

        const allEventsForTab = getAllEventsForTab()
        const currentEvents = getCurrentEvents()

        if (allEventsForTab.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    {emptyIcon}
                    <p className="text-muted-foreground mt-4 text-center">{emptyMessage}</p>
                </div>
            )
        }

        const hasMore = activeTab === 'upcoming' ? hasMoreUpcoming : hasMorePast

        return (
            <div className="space-y-4">
                {currentEvents.map((event) => renderEvent(event))}

                {/* Loading more indicator - always at the bottom */}
                {hasMore && (
                    <div ref={loadingRef} className="flex items-center justify-center py-8 w-full">
                        {loadingMore ? (
                            <PostSkeleton />
                        ) : (
                            <div className="h-6" /> // Invisible element for intersection observer
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full pt-24 md:pt-48 pb-24 flex flex-col items-center bg-gradient-to-br from-background to-muted">
            <div className="max-w-4xl w-full px-4 md:px-6 flex flex-col flex-1 z-10">
                <div className="mb-8 md:mb-12 text-center flex-shrink-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-primary tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-sm">
                        <span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2">
                            <Calendar className="inline-block" size={40} />
                        </span>
                        <span className="relative">
                            Events
                            <span className="block h-1 w-2/3 mx-auto mt-2 rounded-full bg-primary/60" />
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-secondary-foreground max-w-2xl mx-auto font-light mt-2">
                        Discover upcoming events and explore our past activities.
                    </p>
                </div>

                {/* Modern Tab Navigation */}
                <div className="mb-8">
                    <div className="flex bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-1 max-w-md mx-auto">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-out cursor-pointer ${
                                activeTab === 'upcoming'
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Upcoming
                            {allEvents?.upcoming && allEvents.upcoming.length > 0 && (
                                <span className="ml-1 bg-primary-foreground/20 text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                    {allEvents.upcoming.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-out cursor-pointer ${
                                activeTab === 'past'
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                            }`}
                        >
                            <Clock className="w-4 h-4" />
                            Past
                            {allEvents?.past && allEvents.past.length > 0 && (
                                <span className="ml-1 bg-primary-foreground/20 text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                    {allEvents.past.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Events Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'upcoming'
                        ? renderEventsList(
                              'No upcoming events at the moment. Check back soon for new events!',
                              <Calendar className="w-12 h-12 text-muted-foreground" />,
                          )
                        : renderEventsList(
                              'No past events to display.',
                              <Clock className="w-12 h-12 text-muted-foreground" />,
                          )}
                </div>
            </div>
        </div>
    )
}
