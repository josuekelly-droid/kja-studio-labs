// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'kja.studiolabs@outlook.com';

export async function POST(request: NextRequest) {
  try {
    const { nom, email, entreprise, sujet, message } = await request.json();

    if (!nom || !email || !message) {
      return NextResponse.json({ erreur: 'Nom, email et message requis' }, { status: 400 });
    }

    // Sauvegarder dans la BDD
    await prisma.contactMessage.create({
      data: { nom, email, entreprise: entreprise || null, sujet: sujet || 'Nouveau message', message },
    });

    // Envoyer l'email
    await resend.emails.send({
      from: 'KJA Studio Labs <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      subject: `Nouveau message : ${sujet || 'Contact'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
          <div style="background: #4F19A4; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">KJA Studio Labs</h1>
            <p style="color: #D2C4E7; margin: 8px 0 0; font-size: 14px;">Nouveau message de contact</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: bold; width: 120px;">Nom</td><td style="padding: 10px 0; color: #111827; font-size: 14px;">${nom}</td></tr>
              <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: bold;">Email</td><td style="padding: 10px 0; color: #111827; font-size: 14px;">${email}</td></tr>
              ${entreprise ? `<tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: bold;">Entreprise</td><td style="padding: 10px 0; color: #111827; font-size: 14px;">${entreprise}</td></tr>` : ''}
              <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: bold;">Sujet</td><td style="padding: 10px 0; color: #111827; font-size: 14px;">${sujet || 'Nouveau message'}</td></tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; font-weight: bold; margin-bottom: 8px;">Message</p>
              <p style="color: #111827; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br />')}</p>
            </div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 16px;">Envoyé depuis le formulaire de contact de KJA Studio Labs</p>
        </div>
      `,
    });

    return NextResponse.json({ succes: true, message: 'Message envoyé avec succès' });

  } catch (erreur) {
    console.error('Erreur contact:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de l\'envoi' }, { status: 500 });
  }
}