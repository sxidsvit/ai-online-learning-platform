import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
    GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';


const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, 
Description,Course Banner Image Prompt Depends on Course Topics in 3d illustration.
  Chapter Name, , Topic under each chapters ,
   Duration for each chapters etc, in JSON format only

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string"
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ],
       
      }
    ]
  }
}

, User Input: 

`
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export async function POST(req) {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();
    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'starter' }) || has({ plan: 'premium' })
    const config = {
        responseMimeType: 'text/plain',

    };
    const model = 'gemini-2.0-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: PROMPT + JSON.stringify(formData),
                },
            ],
        },
    ];

    //If user already created any course?
    if (!hasPremiumAccess) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress));

        if (result?.length >= 1) {
            return NextResponse.json({ 'resp': 'limit exceed' })
        }
    }

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });


    const RawResp = response?.candidates[0]?.content?.parts[0]?.text
    const RawJson = RawResp.replace('```json', '').replace('```', '');
    const JSONResp = JSON.parse(RawJson);

    const ImagePrompt = JSONResp.course?.bannerImagePrompt;

    // const bannerImageUrl = await GenerateImage(ImagePrompt);

    // console.log('api-generate-course - bannerImageUrl: ', bannerImageUrl);

    const bannerImageUrl = 'https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1748209869537.png?alt=media&token=ac41b974-ec15-4295-90d0-0f6ea3cf4a79'

    // Save to Database

    const result = await db.insert(coursesTable).values({
        ...formData,
        courseJson: JSONResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
        bannerImageUrl: bannerImageUrl
    });


    return NextResponse.json({ courseId: courseId });
}



const GenerateImage = async (imagePrompt) => {
    const BASE_URL = 'https://aigurulab.tech';
    const result = await axios.post(BASE_URL + '/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//'flux'
            aspectRatio: "16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
    return result.data.image;
}
