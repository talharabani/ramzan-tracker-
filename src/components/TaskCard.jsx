const TaskCard = ({ task, completed, onToggle }) => {
  return (
    <div 
      className={`islamic-card cursor-pointer group transition-all duration-300 ${
        completed ? 'bg-gradient-to-br from-islamic-emerald/10 to-islamic-gold/10 border-2 border-islamic-gold' : 'hover:border-islamic-emerald/30'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        <div className={`text-4xl transition-transform duration-300 ${
          completed ? 'scale-110' : 'group-hover:scale-110'
        }`}>
          {task.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-islamic-navy mb-1">{task.name}</h3>
          <span className="text-sm font-medium text-islamic-gold">+{task.points} pts</span>
        </div>
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          completed 
            ? 'bg-islamic-emerald border-islamic-emerald' 
            : 'border-gray-300 group-hover:border-islamic-gold'
        }`}>
          {completed && <span className="text-white text-xl font-bold">✓</span>}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
