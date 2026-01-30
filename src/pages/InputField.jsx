function InputField({ label, icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
        {label}
      </label>
      <div className="relative group mt-1">
        <input
          className="w-full px-5 py-3.5 pl-11 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-white placeholder-slate-600"
          {...props}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default InputField;
