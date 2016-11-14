import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, Input, Output, EventEmitter, IterableDiffers} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'ds-scheduler',
    templateUrl: 'schedule.component.html',
})

// This class was copied from the component Schedule from PrimeNG and modified
// to support the fullcalendar scheduler plugin.
// Maybe it would be better to extend the original component instead.
export class SchedulerComponent implements AfterViewInit, OnDestroy, DoCheck {

    public static SWIPE_RIGHT: number = 2;
    public static SWIPE_LEFT: number = 4;

    // Support for Scheduler
    @Input() resources: any[];
    @Input() resourceAreaWidth: string;
    @Input() resourceLabelText: string;
    // End Support for Scheduler

    // Added functionality
    @Input() slotLabelFormat: any;
    @Input() titleFormat: any;
    @Input() eventBackgroundColor: any;
    // End added properties

    @Input() events: any[];

    @Input() header: any;

    @Input() style: string;

    @Input() styleClass: string;

    @Input() rtl: boolean;

    @Input() weekends: boolean;

    @Input() hiddenDays: number[] = [0,6];

    @Input() locale : string = 'fr';

    @Input() fixedWeekCount: boolean;

    @Input() weekNumbers: boolean;

    @Input() businessHours: any;

    @Input() height: any = 'auto';

    @Input() contentHeight: any;

    @Input() aspectRatio: number = 1.35;

    @Input() eventLimit: any;

    @Input() defaultDate: any;

    @Input() editable: boolean;

    @Input() eventStartEditable: boolean;

    @Input() eventDurationEditable: boolean;

    @Input() defaultView: string = 'month';

    @Input() allDaySlot: boolean = false;

    @Input() slotDuration: any = '00:30:00';

    @Input() slotLabelInterval: any;

    @Input() snapDuration: any;

    @Input() scrollTime: any = '06:00:00';

    @Input() minTime: any = '07:30:00';

    @Input() maxTime: any = '21:30:00';

    @Input() slotEventOverlap: boolean = true;

    @Input() nowIndicator: boolean;

    @Input() dragRevertDuration: number = 500;

    @Input() dragOpacity: number = .75;

    @Input() dragScroll: boolean = true;

    @Input() eventOverlap: any;

    @Input() eventConstraint: any;

    @Output() onDayClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResize: EventEmitter<any> = new EventEmitter();

    @Output() onEventAfterRender: EventEmitter<any> = new EventEmitter();

    @Output() onEventAfterAllRender: EventEmitter<any> = new EventEmitter();

    @Output() onEventLoading: EventEmitter<any> = new EventEmitter();

    apiKey = 'GPL-My-Project-Is-Open-Source';

    initialized: boolean;


    stopNgOnChangesPropagation: boolean;

    differ: any;


    schedule: any;

    elem: HTMLElement;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }

    ngAfterViewInit() {


        this.elem = this.el.nativeElement.children[0].children[1].children[1];
        this.schedule = jQuery(this.elem);

        this.schedule.fullCalendar({
            schedulerLicenseKey: this.apiKey,
            // events: this.events,
            resources: this.resources,
            resourceAreaWidth: this.resourceAreaWidth,
            resourceLabelText: this.resourceLabelText,
            titleFormat: this.titleFormat,
            slotLabelFormat: this.slotLabelFormat,
            eventBackgroundColor: this.eventBackgroundColor,
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            locale : this.locale ,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            allDaySlot: this.allDaySlot,
            events: (start, end, timezone, callback) => {
                callback(this.events);
            },
            // resources: (callback) => {
            //     callback(this.resources);
            // },
            dayClick: (date, jsEvent, view) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventRender: function(event, element,view) {
                var el = element.find('.fc-title');
                if(view.type == "month" || view.type == "agendaWeek"){
                    if(event.location != '')
                        el.append("<br/>" + event.location)
                }else{
                    if(event.location != '')
                        el.append("<br/>" + event.location);
                    if(event.prof != '')
                        el.append("<br/>" + event.prof);
                }
            },
            eventAfterRender: (event, element, view) => {
                this.onEventAfterRender.emit({
                    'event': event,
                    'element': element,
                    'view': view
                });
            },
            eventAfterAllRender: (view) => {
                this.onEventAfterAllRender.emit({
                    'view': view
                });
            },
            loading: (isLoading, view) => {
                this.onEventLoading.emit({
                    'isLoading': isLoading,
                    'view': view
                });
            },
        });
        this.initialized = true;


    }

    ngDoCheck() {

        if(!this.schedule)
            this.schedule = jQuery(this.elem);

        let changes = this.differ.diff(this.events);
        if (changes) {
            this.schedule.fullCalendar('refetchEvents');
            this.schedule.fullCalendar('refetchResources');
        }
    }


    ngOnDestroy() {
        jQuery(this.elem).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    }



    selectView(view) : void {

        this.schedule
            .fullCalendar( 'changeView', view )

    }


    onSwipe(event) : void {
        switch (event.direction){
            case SchedulerComponent.SWIPE_RIGHT :
                this.schedule.fullCalendar( 'next' );
                break;
            case SchedulerComponent.SWIPE_LEFT:
                this.schedule.fullCalendar( 'prev' );
                break;
        }
    }

    today() : void {
        this.schedule.fullCalendar( 'today' );
    }
}


