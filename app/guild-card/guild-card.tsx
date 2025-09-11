interface GuildCardProps {
  name: string;
  icon: string;
  description: string;
  tags: string[];
  games: string[];
}

export default function GuildCard({ name, icon, description, tags, games }: GuildCardProps) {
  return (
    <div>
      <header>
        <Icon 
          src={icon}
          alt={name}
          size={50}
        />
        <h2>{name}</h2>
        <ul>
        {tags.map(tag => (
          <li key={tag}>
            {tag}
          </li>
        ))}
        </ul>
      </header>
      <p>{description}</p>
      <ul>
      {games.map(game => (
        <li key={game}>
          {game}
        </li>
      ))}
      </ul>
    </div>
  );
}

function Icon({ src, alt, size }: { src: string; alt: string; size: number; }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  );
}
