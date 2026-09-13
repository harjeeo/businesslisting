<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Icon extends Component
{
    public array $shapes;

    public function __construct(public string $name, public string $class = 'size-5')
    {
        $icons = require resource_path('icons/hugeicons.php');
        $this->shapes = $icons[$name] ?? [];
    }

    public function render(): View
    {
        return view('components.icon');
    }
}
