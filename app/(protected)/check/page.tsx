import { CheckInput } from '@/components/check/check-input'
import React from 'react'

const CheckPage = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
            <p className=" text-md text-muted-foreground">
                Paste a phone number, link, email, UPI ID, message or upload a
                screenshot to check it against community reports.
            </p>
            <div className='max-w-2xl'>
                <CheckInput />
            </div>

        </div>
    )
}

export default CheckPage