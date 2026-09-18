const COMPANY_IMAGES: Record<string, string> = {
  'Paymob': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=160&q=80',
  'Fawry': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=160&q=80',
  'Giza Systems': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=160&q=80',
  'Valeo Egypt': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=160&q=80',
  'Vortex Egypt': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=160&q=80',
  'TechStart Egypt': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=160&q=80',
  'Nile Systems': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=160&q=80',
  'CodeCraft Solutions': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=160&q=80',
  'DataVision Analytics': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=160&q=80',
  'InnoTech Egypt': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=160&q=80',
  'Breadfast': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=160&q=80',
  'Incorta': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=160&q=80'
};

const DEFAULT_COMPANY_IMAGE = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=160&q=80';

export function resolveCompanyLogo(companyName: string, databaseUrl?: string): string {
  return COMPANY_IMAGES[companyName]
    ?? (databaseUrl && !databaseUrl.includes('example.com') ? databaseUrl : DEFAULT_COMPANY_IMAGE);
}
