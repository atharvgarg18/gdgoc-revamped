interface AdminInstructionsProps {
  section: 'events' | 'team' | 'gallery' | 'projects';
}

export default function AdminInstructions({ section }: AdminInstructionsProps) {
  const getInstructions = () => {
    switch (section) {
      case 'events':
        return {
          title: '📅 Events Management',
          description: 'Add and manage workshop events, bootcamps, and seminars',
          guidelines: [
            {
              icon: '🖼️',
              title: 'Event Images',
              content: 'Use high-quality images (1200x600px recommended). Upload to image hosting service like Unsplash, Imgur, or Cloudinary and paste the URL.'
            },
            {
              icon: '📝',
              title: 'Event Details',
              content: 'Write clear, engaging descriptions (100-300 words). Include what attendees will learn and any prerequisites.'
            },
            {
              icon: '🎨',
              title: 'Event Colors',
              content: 'Choose colors that match your event type: Blue for workshops, Green for bootcamps, Red for seminars, Yellow for sprints.'
            },
            {
              icon: '🔗',
              title: 'Registration Links',
              content: 'Add Google Forms or Eventbrite links for registration. Make sure links are public and accessible.'
            }
          ]
        };
      
      case 'team':
        return {
          title: '👥 Team Management',
          description: 'Manage team member profiles and information',
          guidelines: [
            {
              icon: '📸',
              title: 'Profile Photos',
              content: 'Use professional headshots (400x400px square). Ensure good lighting and clear visibility of face.'
            },
            {
              icon: '📄',
              title: 'Bio Guidelines',
              content: 'Write concise bios (50-150 words). Include expertise, interests, and role in the community.'
            },
            {
              icon: '🔗',
              title: 'Social Links',
              content: 'Add LinkedIn, GitHub, Twitter, Instagram URLs. Make sure profiles are public and professional.'
            },
            {
              icon: '📊',
              title: 'Display Order',
              content: 'Lower numbers appear first. Use 1 for leads, 2-10 for core team, 11+ for members.'
            }
          ]
        };
      
      case 'gallery':
        return {
          title: '🖼️ Gallery Management',
          description: 'Manage photo collections from events and activities',
          guidelines: [
            {
              icon: '📷',
              title: 'Photo Quality',
              content: 'Use high-resolution photos (800x600px minimum). Ensure good lighting and clear subjects.'
            },
            {
              icon: '🏷️',
              title: 'Categories',
              content: 'Workshop: Learning sessions, Event: Community gatherings, Competition: Contests, Community: Social activities.'
            },
            {
              icon: '📅',
              title: 'Date Format',
              content: 'Use YYYY-MM-DD format (e.g., 2024-12-25) for consistent sorting and display.'
            },
            {
              icon: '🔢',
              title: 'Multiple Images',
              content: 'For multiple photos from same event, create separate entries with similar titles but different display_order values.'
            }
          ]
        };
      
      case 'projects':
        return {
          title: '🚀 Projects Management',
          description: 'Showcase community projects and achievements',
          guidelines: [
            {
              icon: '🖥️',
              title: 'Project Images',
              content: 'Use screenshots or mockups (800x600px recommended). Show the project in action or final result.'
            },
            {
              icon: '📋',
              title: 'Descriptions',
              content: 'Explain what the project does, technologies used, and impact (100-200 words).'
            },
            {
              icon: '💻',
              title: 'Tech Stack',
              content: 'List technologies used: React, Node.js, Python, etc. Separate with commas for proper display.'
            },
            {
              icon: '🔗',
              title: 'Project Links',
              content: 'GitHub: Repository URL, Live: Deployed application URL. Ensure links are public and working.'
            }
          ]
        };
      
      default:
        return null;
    }
  };

  const instructions = getInstructions();
  if (!instructions) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3">{instructions.title.split(' ')[0]}</div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{instructions.title}</h3>
          <p className="text-gray-600 text-sm">{instructions.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions.guidelines.map((guideline, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-start space-x-3">
              <div className="text-xl flex-shrink-0">{guideline.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{guideline.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{guideline.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="text-yellow-600">💡</div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Pro Tip</h4>
            <p className="text-yellow-700 text-sm">
              Always preview your content before saving. Use the connection status indicator at the top to ensure your changes are being saved to the database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
