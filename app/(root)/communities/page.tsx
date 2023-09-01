import React from 'react'
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';
import ProfileHeader from '@/components/shared/ProfileHeader';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';
import Community from '@/lib/models/community.model';
import CommunityCard from '@/components/cards/CommunityCard';
import { fetchCommunities } from '@/lib/actions/community.actions';

async function Page() {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  // fetch communities
  const results = await fetchCommunities({
    searchString: '',
    pageNumber: 1,
    pageSize: 25
  })

  return (
    <section>
      <h1 className='head-text mb-10'>
        Search
      </h1>
      <div className='mt-14 flex flex-col gap-9'>
        {results.communities.length === 0 ? (
          <p className='no-result'>No communities yet</p>
        ) : (
          <>
            {results.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page
